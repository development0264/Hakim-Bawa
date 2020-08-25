import React, { FC } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import * as Yup from 'yup';
import defaultStyles from 'src/styles/defaultStyles';
import { StackParamList } from 'src/nav/root/RootStack';
import { Routes } from 'src/common/routes';
import FormField from 'src/components/forms/FormField';
import Form from 'src/components/forms/Form';
import SubmitButton from 'src/components/forms/SubmitButton';
import { values } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface Props {
  route: RouteProp<StackParamList, Routes.List>;
  navigation: NavigationProp<StackParamList, Routes.List>;
}
const ListItem: FC<Props> = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t('common:error.titleRequired')),
    subtitle: Yup.string().required(t('common:error.subRequired')),

  });


  const ondelete = (index) => {
    route.params.Data.splice(index, 1);
    navigation.navigate(Routes.List, route.params.Data);
  }

  return (
    <View style={styles.container}>
      <Text h1>Add Some items!</Text>
      <Text h4>Add an icon name and a title</Text>

      <ScrollView>
        {route.params && route.params.Data != "" ?
          <FlatList
            data={route.params && route.params.Data}
            renderItem={({ item, index }) => (
              <View style={styles.listrow}>
                <View style={styles.listflex}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
                <TouchableOpacity style={styles.listbutton} onPress={() => { ondelete(index) }}>
                  <Image style={styles.listimage} source={require("../../../images/delete.png")}></Image>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ id }, index) => id}
          /> : null}

        <Form
          initialValues={{
            Data: [],
            title: "",
            subtitle: ""
          }}
          onSubmit={({ Data, title, subtitle }) => {
            console.log(title)
            Data.push({ title: title, subtitle: subtitle })
            navigation.navigate(Routes.List, { Data });

          }}

          validationSchema={validationSchema}>
          <FormField name="title" placeholder={t('common:welcome.title')} />
          <FormField name="subtitle" placeholder={t('common:welcome.subtitle')} />
          <SubmitButton title={t('Add item')} containerStyle={{ width: '100%' }} />
        </Form>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...defaultStyles.screenPadding,
  },

  listflex: {
    ...defaultStyles.listflex,
  },

  listrow: {
    ...defaultStyles.listrow
  },
  title: {
    ...defaultStyles.title
  },
  subtitle: {
    ...defaultStyles.subtitle
  },
  listbutton: {
    ...defaultStyles.listbutton
  },
  listimage: {
    ...defaultStyles.listimage
  }
});
export default ListItem;
