import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; 
import { GenerateTestUseCase } from '@/domain/use-cases/tests/GenerateTestUseCase'; 

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('API: User not authenticated', authError);
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const userId = user.id;
    let categoryId: string | undefined = undefined;

    // Safely parse the request body
    try {
        const body = await request.json();
        if (body && typeof body.categoryId === 'string') {
            categoryId = body.categoryId;
        }
    } catch (parseError) {
        // If body is not valid JSON or categoryId is not a string, proceed without it (generic test)
        console.warn('API: Could not parse categoryId from request body or invalid format. Proceeding with generic test.', parseError);
    }

    const generateTestUseCase = GenerateTestUseCase.create(supabase);

    console.log(`API: Generating test for user ${userId}, categoryId: ${categoryId || 'generic'}`);

    const testExecutionId = await generateTestUseCase.execute({
      userId,
      baseCategoryId: categoryId,
    });

    console.log(`API: Test generated successfully with execution ID: ${testExecutionId}`);
    return NextResponse.json(
      { success: true, testExecutionId: testExecutionId },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('API: Error creating test:', error);
    let errorMessage = 'Failed to create test';
    if (error && typeof error.message === 'string') {
        errorMessage = error.message; 
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 } // Use 500 for general server errors
    );
  }
} 