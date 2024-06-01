// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';


export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [totalExpense, setTotalExpense] = useState(null);
  const token = useSelector(state => state.token);
  console.log(token)

  useEffect(() => {
    fetchTotalExpense();
  }, []);

  const fetchTotalExpense = async () => {
    try {
      const month = new Date().getMonth(); // Current month
      const year = new Date().getFullYear(); // Current year
      const accessToken = token; // Replace with your actual access token

      const response = await fetch(`https://money-manager-ebon.vercel.app/expenses/totalexpense?month=${month}&year=${year}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },

      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setTotalExpense(data);
      } else {
        console.error('Failed to fetch total expense:', data.message);
      }
    } catch (error) {
      console.error('Error fetching total expense:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Expense</Text>
      {totalExpense !== null ? (
        <Text>Total Expense: {totalExpense}</Text>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
});
