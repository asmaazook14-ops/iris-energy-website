'use server';

import { z } from 'zod';
import { getServiceSupabase } from '@/lib/supabase';

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  organization: z.string().optional(),
  projectType: z.string().min(2, "Project type is required"),
  projectLocation: z.string().min(2, "City and country are required"),
  poolVolume: z.string().optional(),
  requirement: z.string().min(2, "Requirement is required"),
  targetTemperature: z.string().optional(),
  operatingSeason: z.string().optional(),
  existingSystem: z.string().optional(),
  projectNotes: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, "You must acknowledge the privacy policy"),
  honeypot: z.string().max(0, "Spam detected"), // Anti-spam
});

export async function submitStudyRequest(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get('fullName'),
      organization: formData.get('organization'),
      projectType: formData.get('projectType'),
      projectLocation: formData.get('projectLocation'),
      poolVolume: formData.get('poolVolume'),
      requirement: formData.get('requirement'),
      targetTemperature: formData.get('targetTemperature'),
      operatingSeason: formData.get('operatingSeason'),
      existingSystem: formData.get('existingSystem'),
      projectNotes: formData.get('projectNotes'),
      privacy: formData.get('privacy') === 'on',
      honeypot: formData.get('phone_number_optional'), // hidden field
    };

    const validatedData = schema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: 'Please check the form for errors.',
      };
    }

    // Initialize Supabase service client
    const supabase = getServiceSupabase();
    
    if (supabase) {
      const { error: dbError } = await supabase
        .from('study_requests')
        .insert([
          {
            full_name: validatedData.data.fullName,
            organization: validatedData.data.organization,
            project_type: validatedData.data.projectType,
            project_location: validatedData.data.projectLocation,
            pool_volume: validatedData.data.poolVolume,
            requirement: validatedData.data.requirement,
            target_temperature: validatedData.data.targetTemperature,
            operating_season: validatedData.data.operatingSeason,
            existing_system: validatedData.data.existingSystem,
            project_notes: validatedData.data.projectNotes,
          }
        ]);
        
      if (dbError) {
        console.error("Supabase Insertion Error:", dbError);
        throw new Error("Failed to save to database");
      }
    } else {
      console.warn("Supabase client not initialized, skipping database insertion. Form Data:", validatedData.data);
    }

    return {
      success: true,
      message: 'Your project study request has been submitted successfully. Our engineering team will review it.',
    };
  } catch (error) {
    console.error("Form Submission Error:", error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
