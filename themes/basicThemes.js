import { createTheme } from '@rneui/themed';

// palette is kept as a separate variable to make it easy to change colours
const themePalette = {
    white: '#F9F9F9',
    green: '#00495F',
    greenDark: '#003443',
    grey: '#666',
    greyDarker: '#888888',
    greyLighter: '#979797'
}

// a theme follows the pattern: components > [ComponentType] > [ComponentStyle]
export const basicTheme = createTheme({
    components: {
        Button: {
            // Default button style
            buttonStyle: {
              borderRadius: 15,
              backgroundColor: themePalette.white,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderColor: themePalette.green,
              borderWidth: 1
            },
            titleStyle: {
              color: themePalette.green,
              fontSize: 14
            },
            disabledStyle: {
              backgroundColor: themePalette.greyDarker,
            },
            icon: {
              color: themePalette.alternate,
            },
            type: 'clear'
          },
          // Add another button style
          GreenBtn: {
            buttonStyle: {
              borderRadius: 10,
              backgroundColor: themePalette.green,
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderColor: themePalette.white,
              borderWidth: 2
            },
            titleStyle: {
              color: themePalette.white,
              fontSize: 16
            },
            disabledStyle: {
              backgroundColor: themePalette.greyLighter,
            },
            icon: {
              color: themePalette.white,
            },
            type: 'outline'
          },
        Text: {
            h1Style: {
                color: themePalette.white,
                fontSize:48,
                fontWeight: 'bold',
                fontFamily: 'Poppins_700Bold',

            },
            h2Style: {
                color: themePalette.greenDark,
                fontWeight: 'bold',
                fontFamily: 'Poppins_700Bold',
                fontSize: 20,
            },
            h3Style: {
                color: themePalette.greenDark,
                fontWeight: 'normal',
                fontFamily: 'Poppins_400Regular',
                fontSize: 16,
            },
            style: {
                margin: 5,
                fontFamily: 'Quicksand_400Regular',
            }
        },

        Avatar: {
            avatarStyle: {
                borderColor: themePalette.primary,
                borderWidth: 1,
            },
            size: 50
        },

        Divider: {
            color: themePalette.primaryLighter,
            width: 2
        },

        FAB: {
            buttonStyle: {
                raised: true,
                borderRadius: 15,
                backgroundColor: themePalette.primary,
            },
            titleStyle: {
                color: themePalette.alternate
            },
            icon: {
                color: themePalette.alternate,
            },
            type: 'clear'
        },
    
        CheckBox:{
            checkedColor:themePalette.primaryLighter,
            containerStyle:{
                backgroundColor:'transparent',            
            },
            textStyle:{
                fontFamily: 'OpenSans-Regular',
                fontWeight: 'normal',
            }
    
        }
    },


});