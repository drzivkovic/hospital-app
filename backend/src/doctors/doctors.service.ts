import { Injectable } from '@nestjs/common';

export class Doctor {
  id: number;
  doctorsName: string;
  patientsName: string;
  treatment: string;
}

@Injectable()
export class DoctorsService {
  doctors: Doctor[] = [{
    id: 1,
    doctorsName: 'Ivan Zivkovic',
    patientsName: 'Marko',
    treatment: 'asdadasd'
  },
  {
    id: 2,
    doctorsName: 'Tanja Labovic',
    patientsName: 'Marko',
    treatment: 'paracetamol'
  }];

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  createDoctor(doctor: Doctor): Doctor {
    let newDoctor = new Doctor();
    newDoctor.id = this.doctors.length + 1;
    newDoctor.doctorsName = doctor.doctorsName;
    newDoctor.patientsName = doctor.patientsName;
    newDoctor.treatment = doctor.treatment;
    this.doctors.push(newDoctor);
    return newDoctor;
  }

  // updateDoctor(id: number, doctor: Doctor): Doctor {
  //   let updateDoctor = this.doctors.find(d => d.id == id );
  //   updateDoctor.name = doctor.name;
  //   return updateDoctor;
  // }

  deleteDoctor(id: number) {
    this.doctors = this.doctors.filter(d => d.id != id);
  }
}
