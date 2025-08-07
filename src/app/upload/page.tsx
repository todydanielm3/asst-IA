'use client';

import { useState } from 'react';
import { Upload, FileText, Image, X, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { MaDRIALogo } from '@/components/MaDRIALogo';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  extractedText?: string;
  labResults?: any[];
  error?: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (fileList: File[]) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    fileList.forEach(file => {
      if (!validTypes.includes(file.type)) {
        alert(`Tipo de arquivo não suportado: ${file.name}`);
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert(`Arquivo muito grande: ${file.name}`);
        return;
      }

      const newFile: UploadedFile = {
        id: `file_${Date.now()}_${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      setFiles(prev => [...prev, newFile]);
      uploadFile(file, newFile.id);
    });
  };

  const uploadFile = async (file: File, fileId: string) => {
    try {
      // Simular progresso de upload
      const updateProgress = (progress: number) => {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      };

      // Simular upload gradual
      for (let i = 0; i <= 50; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        updateProgress(i);
      }

      // Mudar status para processamento
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'processing', progress: 60 } : f
      ));

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'completed', 
                progress: 100,
                extractedText: result.extractedText,
                labResults: result.labResults
              } 
            : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'error', error: result.error } 
            : f
        ));
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'error', error: 'Erro no upload' } 
          : f
      ));
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <MaDRIALogo size="sm" textSize="md" />
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-900">Upload de Exames</h1>
            </div>
            <Link 
              href="/dashboard"
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instruções */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upload de Exames Médicos
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Como funciona:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Faça upload de PDFs ou imagens dos seus exames laboratoriais</li>
              <li>• Nossa IA extrai automaticamente os valores e unidades</li>
              <li>• Identificamos valores fora da faixa de referência</li>
              <li>• Os dados são integrados ao seu perfil para gerar recomendações</li>
            </ul>
          </div>
        </div>

        {/* Área de Upload */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Arraste arquivos aqui ou clique para selecionar
          </h3>
          <p className="text-gray-600 mb-4">
            Formatos aceitos: PDF, JPG, PNG (máximo 10MB por arquivo)
          </p>
          
          <input
            type="file"
            id="file-input"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileInput}
            className="hidden"
          />
          <label
            htmlFor="file-input"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            <Upload className="h-5 w-5 mr-2" />
            Selecionar Arquivos
          </label>
        </div>

        {/* Lista de Arquivos */}
        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Arquivos Carregados
            </h3>
            <div className="space-y-4">
              {files.map(file => (
                <div key={file.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {file.type === 'application/pdf' ? (
                          <FileText className="h-6 w-6 text-red-600" />
                        ) : (
                          <Image className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        
                        {/* Barra de Progresso */}
                        {file.status !== 'completed' && file.status !== 'error' && (
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>
                                {file.status === 'uploading' ? 'Enviando...' : 'Processando...'}
                              </span>
                              <span>{file.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Status de Conclusão */}
                        {file.status === 'completed' && (
                          <div className="mt-3 space-y-3">
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              <span className="text-sm font-medium">Processamento concluído</span>
                            </div>
                            
                            {file.labResults && file.labResults.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-gray-900 mb-2">
                                  Exames identificados:
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {file.labResults.map((result, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                      <span className="text-sm text-gray-700">{result.testName}</span>
                                      <span className={`text-sm font-medium ${
                                        result.isAbnormal ? 'text-red-600' : 'text-green-600'
                                      }`}>
                                        {result.value} {result.unit}
                                        {result.isAbnormal && ' ⚠️'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {file.extractedText && (
                              <details className="mt-3">
                                <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                                  Ver texto extraído
                                </summary>
                                <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-700 max-h-32 overflow-y-auto">
                                  {file.extractedText}
                                </div>
                              </details>
                            )}
                          </div>
                        )}

                        {/* Status de Erro */}
                        {file.status === 'error' && (
                          <div className="mt-3 flex items-center text-red-600">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span className="text-sm">{file.error || 'Erro no processamento'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dicas */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 Dicas para melhores resultados:</h3>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Certifique-se de que o texto esteja legível e bem iluminado</li>
            <li>• Inclua a data de realização do exame</li>
            <li>• Mantenha os valores de referência visíveis</li>
            <li>• Se possível, digitalize em alta resolução</li>
            <li>• Evite folhas amassadas ou com dobras sobre os valores</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
