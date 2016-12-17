import BABYLON from 'babylonjs';
import Abstract3DObject from './Abstract3DObject';
import CommitAppear from '../animations/CommitAppear';
import CommitDisappear from '../animations/CommitDisappear';
import Text from './Text';
import SimpleColorMaterial from '../materials/SimpleColorMaterial';

let commitConfig = {
  segments: 16,
  diameter: 10
};

export default class Commit extends Abstract3DObject {

  constructor (ref, message, position, scene) {
    super(ref, scene);
    this._createSphere = ::this._createSphere;
    this.disappear = ::this.disappear;

    this.ref = ref;
    this.message = message;
    this.mesh = this._createSphere();
    this.mesh.renderTextureMaterial = new SimpleColorMaterial(scene,
      new BABYLON.Color3(Math.random(), Math.random(), Math.random()));
    this.mesh.renderEdges = true;
    this.setPosition(position);

    var commitAppearAnimation = new CommitAppear(this, scene);
    var textPosition = position.clone();
    textPosition.y += 1;
    this.text = new Text(message, textPosition, scene);
  }

  disappear () {
    var commitDisappearAnimation = new CommitDisappear(this, this.scene);
  }

  _createSphere () {
    return BABYLON.Mesh.CreateSphere(this.ref, commitConfig.segments, commitConfig.diameter, this.scene);
  }

}
