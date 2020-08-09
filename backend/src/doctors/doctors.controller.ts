import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Doctor, DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
    constructor(private doctorsService: DoctorsService) {}

    // get all doctors
    @Get()
    getDoctors() {
      return this.doctorsService.getDoctors();
    }
  
    // get doctor by id
    // need this when we refresh edit page so we can repopulate inputs with correct data
    @Get(':id') 
    getDoctor(@Param() params) {
      return this.doctorsService.getDoctors().filter(p => p.id == params.id)[0];
    }
  
    // add new doctor
    @Post()
    createDoctor(@Body() doctor: Doctor) {
      return this.doctorsService.createDoctor(doctor);
    }
  
    // edit doctor
    @Put(':id')
    updateProduct(@Param() params, @Body() doctor: Doctor) {
      return this.doctorsService.updateDoctor(params.id, doctor);
    }
  
    // delete doctor
    @Delete(':id')
    deleteProduct(@Param() params) {
      this.doctorsService.deleteDoctor(params.id);
    }
}
