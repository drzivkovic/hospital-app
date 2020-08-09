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

  // get all doctors
  getDoctors(): Doctor[] {
    return this.doctors;
  }

  //create a doctor
  createDoctor(doctor: Doctor): Doctor {
    let newDoctor = new Doctor();
    let lastInputId = 0;
    // check if we have any doctors already in
    if (this.doctors.length) {
      // get the last inputs id in the arrat of doctors
      lastInputId = parseInt(this.doctors[this.doctors.length - 1].id);
    }
    // set the id for newly created doctor 
    newDoctor.id = String(lastInputId+1);
    // set the name for newly created doctor
    newDoctor.doctorName = doctor.doctorName;
    // set the patient for newly created doctor
    newDoctor.patientName = doctor.patientName;
    // set the treatment for newly created doctor
    newDoctor.treatment = doctor.treatment;

    // pust the newly created doctor in doctors array
    this.doctors.push(newDoctor);

    return newDoctor;
  }

  // update the dctor
  updateDoctor(id: string, doctor: Doctor): Doctor {
    // find the doctor for editing by ID
    let updateDoctor = this.doctors.find(d => d.id == id );
    // update doctors name, patient and treatment
    updateDoctor.doctorName = doctor.doctorName;
    updateDoctor.patientName = doctor.patientName;
    updateDoctor.treatment = doctor.treatment;
    return updateDoctor;
  }

  // delete doctor
  deleteDoctor(id: string) {
    this.doctors = this.doctors.filter(d => d.id != id);
  }
}
