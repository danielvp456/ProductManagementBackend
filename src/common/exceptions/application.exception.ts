import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(
      {
        status,
        error: 'Application Error',
        message,
      },
      status,
    );
  }
}

export class UserNotFoundException extends ApplicationException {
  constructor(id: string) {
    super(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class EmailAlreadyExistsException extends ApplicationException {
  constructor() {
    super('Email already exists', HttpStatus.CONFLICT);
  }
}

export class InvalidCredentialsException extends ApplicationException {
  constructor() {
    super('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
} 