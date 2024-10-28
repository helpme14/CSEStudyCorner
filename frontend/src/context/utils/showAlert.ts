// utils.ts

import swal from "sweetalert2";

export const showAlert = (title: string, icon: "success" | "error", text?: string) => {
  swal.fire({
    title,
    icon,
    text,
    toast: true,
    timer: 3000,
    position: "top-right",
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
