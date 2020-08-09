import { Injectable } from '@nestjs/common';

export class Doctor {
  id: string;
  doctorName: string;
  patientName: string;
  treatment: string;
}

@Injectable()
export class DoctorsService {
  doctors: Doctor[] = [];

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  createDoctor(doctor: Doctor): Doctor {
    let newDoctor = new Doctor();
    let lastInputId = 0;
    if (this.doctors.length) {
      lastInputId = parseInt(this.doctors[this.doctors.length - 1].id);
    }
    newDoctor.id = String(lastInputId+1);
    newDoctor.doctorName = doctor.doctorName;
    newDoctor.patientName = doctor.patientName;
    newDoctor.treatment = doctor.treatment;
    this.doctors.push(newDoctor);

    return newDoctor;
  }

  updateDoctor(id: string, doctor: Doctor): Doctor {
    let updateDoctor = this.doctors.find(d => d.id == id );
    updateDoctor.doctorName = doctor.doctorName;
    updateDoctor.patientName = doctor.patientName;
    updateDoctor.treatment = doctor.treatment;
    return updateDoctor;
  }

  deleteDoctor(id: string) {
    this.doctors = this.doctors.filter(d => d.id != id);
  }
}
