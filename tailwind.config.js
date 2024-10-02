/** @type {import('tailwindcss').Config} */


export default {

  content: [ 
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/tw-elements-react/dist/js/**/*.js"
],
  theme: {

    colors:{
      pBlue : '#52b2bf;',
      pBlueButton : '#60CEDD',
      inputText:'#999999',
      alertTextG:'#BEBEBE',
      borderGray:'#BEBEBE',
      backGroundBlack:'#121212',
      backGroundNavy:'#06041A',
      backGroundGradientGray:'#222222',
      white : '#FFFFFF',
      black : '#0D0907',
      bNavy : '#010A1B',
      idAlertText : '#A0A0A0',
      idAlertText2 : '#B4B4B4',
      backGroundTeal: '#193448',
      backGroundBlue:'#112838',
      goldenYellow:'#E6B66A',
      lightBlue:'#5A68C4'
    },
    extend: {
      backgroundImage: {
        LOGO:'url(./PROSOTERIA.svg)',
       
      }
      
    },
    fontFamily:{
      SGUV:['SOGANGUNIVERSITYTTF'],
      RIDIB:['RIDIBatang'],
      SANHA:['Diphylleia-Regular'],
      DUNGGUNMO:['DungGeunMo'],
      DF :['DNFForgedBlade'],
      GP :['GapyeongHanseokbong-Bold'],
      LightB:['LightBold'],
      LightR:['LightRegular']
      

    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tw-elements/plugin.cjs")],
}
