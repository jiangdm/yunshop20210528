<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import digital_asset_controller from "./digital_asset_controller";

export default digital_asset_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #container {
    height: 40rem;
    width: 100%;
    border: 1px solid #000;
    margin: 0;
    position: relative;
    overflow: hidden;
  }

  .overlay {
    z-index: 10000;
    position: absolute;
    width: 120px;
    top: 0;
    left: 0;
    text-align: center;
    margin-left: -60px;
    cursor: pointer;
  }

  .overlay-label {
    position: absolute;
    width: 120px;
    text-align: center;
    top: -20px;
    color: rgb(255, 255, 255);
    display: block;
    font-size: 14px;
    text-shadow: black 2px 2px 2px;
    cursor: pointer;
  }

  .overlay-arrow {
    width: 40px;
    height: 28px;
    cursor: pointer;
  }

  .glass-btn {
    position: absolute;
    width: 30px;
    right: 10px;
    top: 10px;
  }

  .glass-exitbtn {
    position: absolute;
    width: 60px;
    left: 10px;
    top: 10px;
    padding: 4px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
  }

  .glass-exitbtn1 {
    top: 50%;
    left: 82%;
    margin-top: -15px;
    margin-left: 0;
    transform: rotate(90deg);
  }

  .glass-exitbtn2 {
    top: 5;
    left: 50%;
    margin-top: 0;
    margin-left: -30px;
    transform: rotate(0deg);
  }

  .test-btn {
    display: none;
    position: absolute;
    width: 100px;
    left: 100px;
    top: 0;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
  }

  .center-point {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    box-shadow: 2px 2px 2px #000;
  }

  .controls {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .row {
    display: flex;
    margin: 10px 0;
  }

  .label {
    width: 50px;
  }

  #add-overlay,
  #save-rotation {
    background: rgb(25, 143, 123);
    border-radius: 5px;
    cursor: pointer;
    padding: 4px;
    color: #fff;
  }

  #scene-list {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
  }

  .scene-item {
    width: 120px;
    height: 80px;
    position: relative;
    margin: 0 8px;
    overflow: hidden;
    cursor: pointer;
  }

  .scene-item img {
    width: 100%;
    height: auto;
  }

  .scene-item .title {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: #fff;
  }

  .scene-item .btn {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    color: #fff;
  }
</style>
