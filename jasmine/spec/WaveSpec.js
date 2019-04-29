describe("Wave", function(){
  var wave;

  beforeEach(function() {
    wave = wave.initMp3Player();
  });
  
  it("should construct with these values", function(){
    expect(wave.audio)         .toBeTruthy();
    expect(wave.audio.controls).toBeTruthy();
    expect(wave.audio.loop)    .toBeTruthy();
    expect(wave.audio.autoplay).toBeTruthy();
  });
});