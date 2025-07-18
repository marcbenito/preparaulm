import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { CompleteTestExecutionUseCase } from '@/domain/use-cases/CompleteTestExecutionUseCase';


export async function POST(request: Request) {
  try {
    const { testExecutionId, categoryId } = await request.json();
    
    if (!testExecutionId) {
      return NextResponse.json({ error: 'Missing testExecutionId' }, { status: 400 });
    }
    
    // Convertir testExecutionId a número
    const testExecutionIdNumber = Number(testExecutionId);
    if (isNaN(testExecutionIdNumber)) {
      return NextResponse.json({ error: 'Invalid testExecutionId' }, { status: 400 });
    }
    
    // Obtener el cliente de Supabase para autenticación
    const supabase = createRouteHandlerClient({ cookies });
    
    // Verificar autenticación de usuario
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Completar el test usando el caso de uso
    const completeTestExecutionUseCase = new CompleteTestExecutionUseCase(supabase);
    const testExecution = await completeTestExecutionUseCase.execute(
      testExecutionIdNumber,
      user.id
    );
    
    return NextResponse.json({ 
      success: true,
      testExecutionId: testExecution.id,
      score: testExecution.score
    });
    
  } catch (error) {
    console.error('Error completing test:', error);
    return NextResponse.json({ error: 'Failed to complete test' }, { status: 500 });
  }
}