import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';

const LinkText = ({ text }) => {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const renderLink = (match, index) => {
    const url = match[0];
    return (
      <TouchableOpacity key={index} onPress={() => handleLinkPress(url)}>
        <Text style={styles.link}>{url}</Text>
      </TouchableOpacity>
    );
  };

  const renderTextWithLinks = () => {
    const linkRegex = /(\b(?:https?|ftp):\/\/[^\s]+)/g;
    const matches = text?.match(linkRegex);

    if (matches) {
      const parts = text.split(linkRegex);
      return parts.map((part, index) => {
        if (matches.includes(part)) {
          return renderLink([part], index);
        }
        return <Text key={index}>{part}</Text>;
      });
    }

    return <Text>{text}</Text>;
  };

  return <>{renderTextWithLinks()}</>;
};

const styles = {
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
};

export default LinkText;