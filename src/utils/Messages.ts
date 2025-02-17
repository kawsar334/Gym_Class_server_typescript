


// validation api response typscript 
export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
  errorDetails?: any;
}

// alll response message here success error validation etc.................
class ResponseUtil{
  public static successResponse(statusCode:number,message:string, data:any):ApiResponse{
    return {
      success: true,
      statusCode,
      message,
      data
    };
  }

  public static errorResponse(statusCode:number, message:string,errorDetails:any):ApiResponse{
    return {
      success: false,
      statusCode,
      message,
      errorDetails
    };
  }

  public static unauthorizedResponse(message: string ="Unauthorized access", errorDetails?:string):ApiResponse{
    return {
      success: false,
      statusCode: 401,
      message,
      errorDetails
    };
  }

  public static validationErrorResponse(field: string, message: string):ApiResponse{
    return {
      success: false,
      statusCode: 400,
      message: "Validation error occurred.",
      errorDetails: {
        field,
        message
      }
    };
    
  }

  public static bookingLimitExceededResponse(): ApiResponse {
    return {
      success: false,
      statusCode: 403,
      message: "Class schedule is full. Maximum 10 trainees allowed per schedule."
    };
  }

  public static classBookedResponse(data:any):ApiResponse{
    return {
      success: true,
      statusCode: 201,
      message: "Class booked successfully.",
      data
    };
  }

  public static userRegisteredResponse(data:any):ApiResponse{
    return {
      success: true,
      statusCode: 201,
      message: "User registered successfully.",
      data
    };
  }


  public static authRequiredResponse(): ApiResponse {
    return {
      success: false,
      statusCode: 401,
      message: "Authentication required. Please provide a valid token."
    };
  }
}


export const successResponse = ResponseUtil.successResponse;
export const errorResponse = ResponseUtil.errorResponse;
export const unauthorizedResponse =ResponseUtil.unauthorizedResponse
export const validationErrorResponse = ResponseUtil.validationErrorResponse;
export const bookingLimitExceededResponse = ResponseUtil.bookingLimitExceededResponse;
export const classBookedResponse =ResponseUtil.classBookedResponse;
export const userRegisteredResponse = ResponseUtil.userRegisteredResponse;
export const authRequiredResponse =ResponseUtil.authRequiredResponse;
