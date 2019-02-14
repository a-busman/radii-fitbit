function mySettings(props) {
  let colourSet = [
    {color: "#3BF7DE"},   
    {color: "#3182DE"},  
    {color: "#B8FC68"},
    {color: "#5BE37D"},  
    {color: "#F80070"},  
    {color: "#F83C40"},  
    {color: "#E4FA3C"},  
    {color: "#FC6B3A"},
    {color: "#BD4EFC"},
    {color: "#D828B8"},
    {color: "#FFFFFF"},
  ];
  return (
    <Page>
      <Section
        title="Animations">
        <Toggle
          settingsKey="animsEnabled"
          label="Smooth Animations"
        />
        <Toggle
          settingsKey="hrAnimsEnabled"
          label="Heart Rate Animation"
        />
      </Section>
      <Section
        title="Accent Colour">
        <ColorSelect
          settingsKey="accentColour"
          colors={colourSet} />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);