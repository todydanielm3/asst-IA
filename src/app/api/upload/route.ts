import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import { createWorker } from 'tesseract.js';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      );
    }

    // Verificar tipo de arquivo
    const fileType = file.type;
    const supportedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png'
    ];

    if (!supportedTypes.includes(fileType)) {
      return NextResponse.json(
        { success: false, error: 'Tipo de arquivo não suportado' },
        { status: 400 }
      );
    }

    // Converter arquivo para buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let extractedText = '';

    try {
      if (fileType === 'application/pdf') {
        // Processar PDF
        const pdfData = await pdf(buffer);
        extractedText = pdfData.text;
      } else {
        // Processar imagem com OCR
        const worker = await createWorker('por'); // Português
        const { data: { text } } = await worker.recognize(buffer);
        extractedText = text;
        await worker.terminate();
      }
    } catch (ocrError) {
      console.error('Erro na extração de texto:', ocrError);
      return NextResponse.json(
        { success: false, error: 'Erro ao extrair texto do arquivo' },
        { status: 500 }
      );
    }

    // Analisar texto extraído para identificar exames laboratoriais
    const labResults = await analyzeLabText(extractedText);

    // Salvar arquivo (implementar storage posteriormente)
    const fileId = `file_${Date.now()}`;

    return NextResponse.json({
      success: true,
      fileId,
      fileName: file.name,
      fileSize: file.size,
      fileType,
      extractedText: extractedText.substring(0, 1000), // Primeiros 1000 caracteres
      labResults,
      processed: true
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Função para analisar texto e extrair dados de exames
async function analyzeLabText(text: string): Promise<any[]> {
  const labResults: any[] = [];
  
  // Padrões regex para identificar exames comuns
  const patterns = {
    glucose: /glicose.*?(\d+(?:\.\d+)?)\s*(mg\/dl|mmol\/l)/gi,
    cholesterol: /colesterol total.*?(\d+(?:\.\d+)?)\s*(mg\/dl|mmol\/l)/gi,
    hdl: /hdl.*?(\d+(?:\.\d+)?)\s*(mg\/dl|mmol\/l)/gi,
    ldl: /ldl.*?(\d+(?:\.\d+)?)\s*(mg\/dl|mmol\/l)/gi,
    triglycerides: /triglicerídeos.*?(\d+(?:\.\d+)?)\s*(mg\/dl|mmol\/l)/gi,
    hemoglobin: /hemoglobina.*?(\d+(?:\.\d+)?)\s*(g\/dl|g\/l)/gi,
    creatinine: /creatinina.*?(\d+(?:\.\d+)?)\s*(mg\/dl|μmol\/l)/gi,
    urea: /ureia.*?(\d+(?:\.\d+)?)\s*(mg\/dl|mmol\/l)/gi,
    tsh: /tsh.*?(\d+(?:\.\d+)?)\s*(μui\/ml|mui\/l)/gi,
    t4: /t4.*?(\d+(?:\.\d+)?)\s*(ng\/dl|pmol\/l)/gi
  };

  // Valores de referência padrão
  const referenceRanges: Record<string, { min: number; max: number; unit: string }> = {
    glucose: { min: 70, max: 99, unit: 'mg/dl' },
    cholesterol: { min: 0, max: 190, unit: 'mg/dl' },
    hdl: { min: 40, max: 999, unit: 'mg/dl' },
    ldl: { min: 0, max: 130, unit: 'mg/dl' },
    triglycerides: { min: 0, max: 150, unit: 'mg/dl' },
    hemoglobin: { min: 12, max: 16, unit: 'g/dl' },
    creatinine: { min: 0.6, max: 1.2, unit: 'mg/dl' },
    urea: { min: 15, max: 45, unit: 'mg/dl' },
    tsh: { min: 0.4, max: 4.0, unit: 'μUI/ml' },
    t4: { min: 4.5, max: 12.0, unit: 'ng/dl' }
  };

  // Processar cada padrão
  for (const [testName, pattern] of Object.entries(patterns)) {
    const matches = [...text.matchAll(pattern)];
    
    for (const match of matches) {
      const value = parseFloat(match[1]);
      const unit = match[2].toLowerCase();
      const reference = referenceRanges[testName];
      
      if (!isNaN(value) && reference) {
        const isAbnormal = value < reference.min || value > reference.max;
        
        labResults.push({
          testName: testName.charAt(0).toUpperCase() + testName.slice(1),
          value,
          unit: reference.unit,
          referenceMin: reference.min,
          referenceMax: reference.max,
          isAbnormal,
          date: new Date().toISOString().split('T')[0], // Data atual por padrão
          category: getTestCategory(testName)
        });
      }
    }
  }

  return labResults;
}

// Função para categorizar tipos de exame
function getTestCategory(testName: string): string {
  const categories: Record<string, string> = {
    glucose: 'glucose',
    cholesterol: 'lipid',
    hdl: 'lipid',
    ldl: 'lipid',
    triglycerides: 'lipid',
    hemoglobin: 'other',
    creatinine: 'kidney',
    urea: 'kidney',
    tsh: 'thyroid',
    t4: 'thyroid'
  };

  return categories[testName] || 'other';
}
