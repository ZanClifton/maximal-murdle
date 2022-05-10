import {Text, View, KeyboardAvoidingView} from 'react-native';
import styles from './styles';
import {
  query,
  orderBy,
  limit,
  collection,
  queryEqual,
  where,
  getDocs,
} from 'firebase/firestore';
import {db} from '../../../firebase';
import React from 'react';
import Leaderboard from './Leaderboard';

const LeaderboardScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [leaderboardArr, setLeaderboardArr] = React.useState();
  console.log('leaderboardArr:', leaderboardArr);

  React.useEffect(() => {
    const getLeaderboardArr = async () => {
      const leaderboardArr = [];

      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('scores.total', 'desc'), limit(10));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        doc.data();
        leaderboardArr.push(doc.data());
      });

      setLeaderboardArr(leaderboardArr);
    };
    if (!leaderboardArr) getLeaderboardArr();

    if (leaderboardArr) setIsLoading(false);
  }, [leaderboardArr]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
        <Text style={styles.headerText}>
          <Text style={styles.murderText}>Leaderboard</Text>
        </Text>
        {/* <Text style={styles.paragraphText}>Text</Text> */}
        <Leaderboard leaderboardArr={leaderboardArr} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LeaderboardScreen;
