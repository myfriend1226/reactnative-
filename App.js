import React from 'react';
import { StyleSheet, Text, View , ScrollView,DatePickerAndroid,TextInput, Button,Image} from 'react-native';
import {Card, CardSection, Input,Header, ActionSheetTag} from "./src/components"
import { Ionicons } from '@expo/vector-icons';
import { MailComposer } from 'expo';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
        type:[{label:'Safety'},{label:'Environmental'}],
        subType:[{label:'Hazard'},{label:'Near Miss'}],
        potentialRisk:[{label:'Extreme'},{label:'High'},{label:'Medium'},{label:'Low'}],
        site:'',
        location:'',
        reportBy:'',
        reportedTo:'',
        date: new Date().toDateString(),
        description:'',
        immediateAction:'',
        furtherSuggestedAction:'',
        image1: null,
        image2:null

    }
    this.setDate = this.setDate.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.onChangeText=this.hangleChangeText1.bind(this);
    this.onChangeText=this.hangleChangeText2.bind(this);

  }
  setDate(newDate) {
      this.setState({date: newDate});
    }
// update state type
    onPressType = type  => this.setState({ type});
// update state subType
    onPressSubType = subType => this.setState({ subType });
// update state subType
    onPressRisk = potentialRisk => this.setState({ potentialRisk });
    setDateAndroid = async () => {
      try {
        const {
          action, year, month, day,
        } = await DatePickerAndroid.open({
        date: new Date(),
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.setState({ date: `${day}/${month + 1}/${year}` });
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    };
    
    handleSubmit(){
      var image=[]
      if(this.state.image1!=null){
        image.push(this.state.image1);
      }
      if(this.state.image2!=null){
        image.push(this.state.image2);
      }

      MailComposer.composeAsync({
        recipients: ['an_t_h_le@yahoo.com'],
        subject: 'Attachment Test',
        body: 'Testing multiple Attachments',
       
        attachments: image
    })
     
    }
    hangleChangeText1=(imageurl)=>{
      this.setState({image1:imageurl});
    }
    hangleChangeText2=(imageurl)=>{
      this.setState({image2:imageurl});
    }
   
  render() {
    let { image } = this.state;
   
    return (
      <ScrollView>
        <Image style={{margin:10,height: 80,width:240}} source={require("./src/images/logo-large.png")}></Image>
        <Card >
          <Header headerText="Near Miss Report"></Header>
          <CardSection>
          <Input
              placeholder=""
              label="Site"
              value={this.state.site}
              onChangeText={site => this.setState({ site })}
            />

          </CardSection>
          <CardSection>
          <Input
              placeholder=""
              label="Location/ Department"
              value={this.state.location}
              onChangeText={location => this.setState({ location })}
            />

          </CardSection>
          <CardSection>
          <Input
              placeholder=""
              label="Reported By"
              value={this.state.reportBy}
              onChangeText={reportBy => this.setState({ reportBy })}
            />

          </CardSection>
          <CardSection>
          <Input
              placeholder=""
              label="Reported To"
              value={this.state.reportedTo}
              onChangeText={reportedTo => this.setState({ reportedTo })}
            />

          </CardSection>
          <CardSection>
            <Input
                placeholder=""
                label="Date"
                value={this.state.date}             
            />
            <Ionicons name="md-calendar" size={32} onPress={() => this.setDateAndroid()}/>
          </CardSection>
          <View style={styles.containerStyle}>
            <Text style={styles.label}>Description (What, When, Where, how)</Text>
            <TextInput
                    
                    style={styles.input}
                    onChangeText={(description) => this.setState({description})}
                    value={this.state.description}
                    multiline={true}
                    numberOfLines = {4}/>
          </View>
          <View style={styles.containerStyle}>
            <Text style={styles.label}>Immediate Actions Taken</Text>
            <TextInput
                    style={styles.input}
                    onChangeText={(immediateAction) => this.setState({immediateAction})}
                    value={this.state.immediateAction}
                    multiline={true}
                    numberOfLines = {4}/>
          </View>
          <View style={styles.containerStyle}>
            <Text style={styles.label}>Further Actions Suggested</Text>
            <TextInput
                    style={styles.input}
                    onChangeText={(furtherSuggestedAction) => this.setState({furtherSuggestedAction})}
                    value={this.state.furtherSuggestedAction}
                    multiline={true}
                    numberOfLines = {4}/>
          </View>  
            <CardSection>
           <ActionSheetTag image={this.state.image1}  style={{margin:20, padding:10}} onChangeText={this.hangleChangeText1}/>
           </CardSection>
           <CardSection>
           <ActionSheetTag image={this.state.image2} style={{margin:20,padding:10}} onChangeText={this.hangleChangeText2}/>
           </CardSection>
           <CardSection >
           <Button style={{textAlign:"center"}} title="SUBMIT" onPress={this.handleSubmit}/>
           </CardSection >
           
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    
    borderWidth:1,
    margin:10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#F5FCFF',
  },
  label:{
    
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  wrapper: {
      flex: 1,
      marginTop: 150,
    },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative'
  }
});
