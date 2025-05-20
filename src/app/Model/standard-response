export class StandardResponse<T> {
  timestamp: string; 
  message: string;
  details: T;
  status: string;

  constructor(
    message: string,
    details: T,
    status: string,
    timestamp: string = ''
  ) {
    this.timestamp = timestamp;
    this.message = message;
    this.details = details;
    this.status = status;
  }
}