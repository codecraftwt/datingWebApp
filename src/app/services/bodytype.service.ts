import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BodyTypeService {

  constructor() { }

  // Method to calculate body type
  getBodyType(heightInFeet: number, weightInKg: number): string {
    // Convert height from feet to meters
    const heightInMeters = this.feetToMeters(heightInFeet);
    
    // Calculate BMI
    const bmi = this.calculateBMI(heightInMeters, weightInKg);
    
    // Determine body type based on BMI
    return this.getBodyTypeFromBMI(bmi);
  }

  // Convert height in feet to meters (1 foot = 0.3048 meters)
  private feetToMeters(feet: number): number {
    return feet * 0.3048;
  }

  // Calculate BMI
  private calculateBMI(heightInMeters: number, weightInKg: number): number {
    return weightInKg / (heightInMeters * heightInMeters);
  }

  // Determine body type from BMI
  private getBodyTypeFromBMI(bmi: number): string {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
}
