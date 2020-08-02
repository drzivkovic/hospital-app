import { Injectable } from '@nestjs/common';

export class Doctor {
  id: number;
  name: string;
}

@Injectable()
export class DoctorsService {
  doctors: Doctor[] = [{
    id: 1,
    name: 'Ivan Zivkovic'
  },
  {
    id: 2,
    name: 'Tanja Labovic'
  }];

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  createDoctor(doctor: Doctor): Doctor {
    let newDoctor = new Doctor();
    newDoctor.id = this.doctors.length + 1;
    newDoctor.name = doctor.name;
    this.doctors.push(newDoctor);
    return newDoctor;
  }

  updateDoctor(id: number, doctor: Doctor): Doctor {
    let updateDoctor = this.doctors.find(d => d.id == id );
    updateDoctor.name = doctor.name;
    return updateDoctor;
  }

  deleteDoctor(id: number) {
    this.doctors = this.doctors.filter(d => d.id != id);
  }
}
