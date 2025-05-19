import { HttpErrorType } from '@commercetools/sdk-client-v2';

export interface CommerceToolsError extends HttpErrorType {
  body?: {
    statusCode?: number;
    message?: string;
    errors?: Array<{
      code: string;
      message: string;
      detailedErrorMessage?: string;
      field?: string;
      value?: unknown;
      duplicateValue?: unknown;
    }>;
  };
}

export function isCommerceToolsError(
  error: unknown,
): error is CommerceToolsError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    typeof (error as CommerceToolsError).body === 'object'
  );
}

export function getErrorMessage(
  error: unknown,
  context: 'login' | 'registration' | 'general' = 'general',
): string {
  if (!isCommerceToolsError(error)) {
    return context === 'login'
      ? 'Invalid email or password'
      : 'An unexpected error occurred. Please try again later';
  }

  const statusCode = error.body?.statusCode;
  const firstError = error.body?.errors?.[0];

  if (context === 'registration') {
    switch (firstError?.code) {
      case 'DuplicateField':
        return `This ${firstError.field} is already in use. Please use a different ${firstError.field}`;

      case 'InvalidJsonInput':
        return 'Invalid registration data. Please check your input and try again';

      case 'FieldValueNotFound':
        return `The ${firstError.field} is invalid. Please check and try again`;
    }
  }

  switch (statusCode) {
    case 400:
      if (context === 'login') {
        return 'Invalid email or password';
      }
      return (
        firstError?.message || 'Invalid request data. Please check your input'
      );

    case 401:
      return 'Authentication failed. Please check your credentials';

    case 403:
      return 'Access denied. You do not have permission for this action';

    case 409:
      return 'Conflict occurred. Please try again';

    case 429:
      return 'Too many requests. Please wait and try again later';

    default:
      return (
        firstError?.message ||
        'An unexpected error occurred. Please try again later'
      );
  }
}
