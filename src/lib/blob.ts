export function requireBlobCredentials(): void {                                                                      
    if (!process.env.BLOB_READ_WRITE_TOKEN) {                                                                           
      throw new Error("BLOB_READ_WRITE_TOKEN environment variable is not configured.");                                 
    }                                                                                                                   
  }                                                                                                                     
                                                                                                                        
  export function blobErrorResponse(error: unknown, operation: string): { message: string; status: number } {           
    if (error instanceof Error && error.message.includes("BLOB_READ_WRITE_TOKEN")) {                                    
      return { message: "Storage credentials are not configured.", status: 500 };                                       
    }                                                                                                                   
    if (error instanceof Error && error.message.includes("HTTP 404")) {                                                 
      return { message: `${operation} failed: the data was not found.`, status: 404 };                                  
    }                                                                                                                   
    const message = error instanceof Error ? `${operation} failed: ${error.message}` : `${operation} failed.`;          
    return { message, status: 500 };                                                                                    
  }