"use strict";

document.addEventListener("DOMContentLoaded", startGame, false);

function startGame() {
    if (BABYLON.Engine.isSupported()) {
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, false);
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);

        camera.attachControl(canvas);

        // Creating light sphere
        var sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 5, scene);

        var cloudMaterial = new BABYLON.ShaderMaterial("amiga", scene, {
            vertexElement: "vertexShaderCode",
            fragmentElement: "fragmentShaderCode",
        },
        {
            needAlphaBlending: true,
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection"],
            samplers: ["textureSampler"]
        });
        cloudMaterial.setTexture("textureSampler", new BABYLON.Texture("amiga.jpg", scene));

        sphere.material = cloudMaterial;

        engine.runRenderLoop(function () {
            sphere.rotation.y += 0.05;
            scene.render();
        });
    }
};