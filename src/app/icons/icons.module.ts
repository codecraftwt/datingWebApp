import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Users, Lock, User, Bookmark, Image, Activity, Dribbble, Star } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  Users,
  Lock,
  User,
  Bookmark,
  Image,
  Activity,
  Dribbble,
  Star
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
