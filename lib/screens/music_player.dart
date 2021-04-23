
import 'package:flutter/material.dart';

class MusicPlayerScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Screen'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('Launch screen'),
          onPressed: () {
            Navigator.pushNamed(context, '/favorites');
            // Navigate to the second screen when tapped.
          },
        ),
      ),
    );
  }
}
