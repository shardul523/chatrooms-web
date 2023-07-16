import { useToast } from "@chakra-ui/react";

export const useAlert = () => {
    const toast = useToast({
        position: 'top-right',
        variant: 'left-accent',
        duration: 5000,
    });

    return toast;
}