import { Injectable } from '@angular/core';
import { NavItem } from '../Models/navItem.model';

@Injectable()
export class LinkManager {
  headerLinks: NavItem[] = [
    new NavItem('Programming', '/PP/Start'),
    new NavItem('Machine Learning', '/ML/Start'),
    new NavItem('Other', '/ETC/Start'),
  ];

  MlNavArr: NavItem[] = [
    new NavItem('Genetic Algorithm', 'GeneticAlgorithm'),
    //new NavItem('Object Detection', 'TensorflowDetection'),
    new NavItem('Hunter-Prey Simulation', 'HunterPrey'),
    new NavItem('MNIST Generator', 'mnistGen'),
    new NavItem('MNIST Detection', 'mnistClas'),
    //new NavItem('Sketch RNN', 'sketchRNN'),
    new NavItem('Deepdream', '404', false),
  ];

  PpNavArr: NavItem[] = [
    new NavItem('Unity Fractal Explorer', 'FractalExplorer'),
    new NavItem('p5 Noise Art', 'p5-noise'),
    new NavItem('p5 WebGl', 'p5-webgl'),
    new NavItem('A* Pathfinder', 'AStar'),
    new NavItem('Game of Life', 'Conway'),
    new NavItem('Tree Fractal Generator', 'Fractal'),
  ];

  SNavArr: NavItem[] = [
    new NavItem('Blender Gallery', 'Blender'),
    new NavItem('Testpage', 'test'),
  ];

  onHomepage = false;
}
