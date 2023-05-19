export const customDataResponse = (data: any = null, status: number, message: string) => {
   let response = {
      data: data,
      status: status,
      message: message
   }
   return response;
} 