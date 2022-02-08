export interface AuthInterface {
  isSubmitting: boolean;
  isRegistered: boolean;
  isLoggedIn: boolean;
  isReset: boolean;
  validationError: string | null;
}
