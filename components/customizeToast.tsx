import { toast } from "@/hooks/use-toast";
export const successToast = () => {
  toast({
    title: "Success",
    description: "Changes has been saved",
    variant: "default",
  });
};
export const failedToast = (errorCode: number) => {
  toast({
    title: "Error",
    description: `Error ${errorCode}`,
    variant: "destructive",
  });
};
