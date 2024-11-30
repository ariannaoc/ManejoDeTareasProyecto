export const formatDate = (date) => {
    // Get the month, day, and year
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };
  
  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  export function getInitials(fullName) {
    const names = fullName.split(" ");
  
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials.join("");
  
    return initialsStr;
  }
  
  export const PRIORITY_STYLES = {
    alta: "text-red-600",
    media: "text-yellow-600",
    baja: "text-blue-600",
  };
  
  
  export const TASK_TYPE = {
    hacer: "bg-red-600",
    "En progreso": "bg-yellow-400",
    completado: "bg-green-600",
  };
  
  export const BGS = [
    "bg-[#1e90ff]",
    "bg-yellow-400",
    "bg-purple-600",
    "bg-red-600",
  ];