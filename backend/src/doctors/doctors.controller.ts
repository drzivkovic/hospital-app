import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Doctor, DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
    constructor(private doctorsService: DoctorsService) {}

    @Get()
    getDoctors() {
      return this.doctorsService.getDoctors();
    }
  
    @Get(':id') 
    getDoctor(@Param() params) {
      return this.doctorsService.getDoctors().filter(p => p.id == params.id);
    }
  
    @Post()
    createDoctor(@Body() doctor: Doctor) {
      return this.doctorsService.createDoctor(doctor);
    }
  
    @Put(':id')
    updateProduct(@Param() params, @Body() doctor: Doctor) {
      return this.doctorsService.updateDoctor(params.id, doctor);
    }
  
    @Delete(':id')
    deleteProduct(@Param() params) {
      this.doctorsService.deleteDoctor(params.id);
    }
}
