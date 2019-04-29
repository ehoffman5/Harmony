describe("Processor", function() {
  var processor;

  beforeEach(function() {
    processor = new AudioProcessor();
  });

  it("should construct with these values", function(){
    expect(processor.FFTSIZE)                   .toEqual(2048);
    expect(processor.lastRms)                   .toEqual(0);
    expect(processor.rmsThreshold)              .toEqual(0.006);
    expect(processor.assessStringsUntilTime)    .toEqual(0);
    expect(processor.assessedStringsInLastFrame).toBeFalsy();
  });

  it("should get userMedia", function(){
    processor.requestUserMedia();
    expect(processor.sendingAudioData).toBeTruthy();
  });
});