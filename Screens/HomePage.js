import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity,FlatList } from 'react-native';
import { auth,db } from "../firebaseConfig"
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { addDoc, collection,query,doc,where,onSnapshot,updateDoc,deleteDoc } from 'firebase/firestore';

export default function HomePage({ navigation }) {
  const userEmail = auth.currentUser.email;
  const [newTodo, setNewTodo] = useState('');
  const [todos,setTodo] = useState([])

  useEffect(() =>{
    const info = query(collection(db,'text'),where('user','==',userEmail));

    const subscriber = onSnapshot(info,{
      
      next: function(snapshot){
        const todos =[];
        snapshot.docs.forEach(function (doc) {
          todos.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setTodo(todos)
      }
    })
    return () => subscriber();
  },[])






  const handleAddTodo = async () => {
    // TODO: add new todo
    if(!newTodo) return alert("Todo Empty!")
    console.log('New todo:', newTodo);
    try{
        const textInfo = await addDoc(collection(db,'text'), {
        title: newTodo,
        done: false,
        user:userEmail

      })

      setNewTodo('');
      console.log('Document written with ID: ', textInfo.id);
    }
    catch(e)
    {
      alert("Error: Message Could not be saved! ",e)
    }
   
  }

  const renderTodo = ({ item }) => {
    const ref = doc(db, `text/${item.id}`);

    const toggleDone = async () => {
        await updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
        await deleteDoc(ref);
    };

    return(
      <View style={styles.todoContainer}>
			<TouchableOpacity onPress={toggleDone} style={styles.todo}>
				{item.done && <Ionicons name="md-checkmark-circle" size={32} color="green" />}
				{!item.done && <Entypo name="circle" size={32} color="black" />}
				<Text style={styles.todoText}>{item.title}</Text>
			</TouchableOpacity>
			<Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
		</View>
	);
}
  return (
    <LinearGradient colors={['#fff','#fef','#fee','tomato']} style={styles.container}>
      <View style={styles.header}>
      <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Add new todo"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {todos.length > 0 && (
        <View style={{width:"100%"}}>
            <FlatList
              data={todos}
              renderItem={renderTodo}
              keyExtractor={(todo) => todo.id}
              // removeClippedSubviews={true}
            />
			</View>
      )
      }
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F5FCFF',
    width:'100%'
  },
  header: {
    height:'20%',
    width:'100%'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:'2%',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: '2%'
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todo: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
    width:'100%'
	},
	todoText: {
		flex: 1,
		paddingHorizontal: 4,
    width:'100%'
	},
	todoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
		marginVertical: 4,
    width:'100%'
	}
})