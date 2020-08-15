import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TestpageComponent } from './pages/testpage/testpage.component';
import { MachineLearningHomeComponent } from './pages/machine-learning-home/machine-learning-home.component';
import { ProgrammierProjekteHomeComponent } from './pages/programmier-projekte-home/programmier-projekte-home.component';
import { ConwayComponent } from './pages/programmier-projekte-home/conway/conway.component';
import { SonstigesHomeComponent } from './pages/sonstiges-home/sonstiges-home.component';
import { BlenderBilderComponent } from './pages/sonstiges-home/blender-bilder/blender-bilder.component';
import { AStarPathfindingComponent } from './pages/programmier-projekte-home/a-star-pathfinding/a-star-pathfinding.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TreeFractalGeneratorComponent } from './pages/programmier-projekte-home/tree-fractal-generator/tree-fractal-generator.component';
import { MnistDetectionComponent } from './pages/machine-learning-home/mnist-detection/mnist-detection.component';


const appRoutes : Routes = [
  { path : "" , component: HomepageComponent},
  { path : "PP" , component: SidenavComponent, children: [
    {path: "Start", component: ProgrammierProjekteHomeComponent},
    {path: "Conway", component: ConwayComponent},
    {path: "AStar", component: AStarPathfindingComponent},
    {path: "Fractal", component: TreeFractalGeneratorComponent}
  ]},
  { path : "ML" , component: SidenavComponent,children: [
    {path: "Start", component: MachineLearningHomeComponent},
    {path: "mnist", component: MnistDetectionComponent},
  ]},
  { path : "ETC" , component: SidenavComponent, children:[
    {path: "Start" , component: SonstigesHomeComponent},
    {path: "test" , component: TestpageComponent},
    {path: "Blender" , component: BlenderBilderComponent},
  ]},
  {path : "404" , component : PageNotFoundComponent},
  {path : "**" , redirectTo:"/404"}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}) //is being configured
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
