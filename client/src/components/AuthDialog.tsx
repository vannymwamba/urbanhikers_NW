import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'account-not-found' | 'account-exists';
  email: string;
  onAction: () => void;
}

export default function AuthDialog({ isOpen, onClose, type, email, onAction }: AuthDialogProps) {
  const config = {
    'account-not-found': {
      title: 'Account Not Found',
      description: `No account found with the email "${email}". Would you like to create a new account instead?`,
      actionText: 'Create Account',
      cancelText: 'Try Again'
    },
    'account-exists': {
      title: 'Account Already Exists',
      description: `An account with the email "${email}" already exists. Would you like to sign in instead?`,
      actionText: 'Sign In',
      cancelText: 'Try Different Email'
    }
  };

  const { title, description, actionText, cancelText } = config[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300 text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onAction();
              onClose();
            }}
            className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] font-bold"
          >
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}