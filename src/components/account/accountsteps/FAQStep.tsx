import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { scaleWidth, scaleHeight } from '../../../utils/scale';

const FAQ_DATA = [
  {
    group: 'How it works',
    faqs: [
      {
        question: 'What is Stable Stakes?',
        answer: `Stable Stakes is a golf app, available on both iOS and Android, that lets you put a little extra stake on your own game during your club\'s Stableford comp. Basically, it\'s a fun way to earn rewards when you hit a cracking score—no matter where you end up on the leaderboard. Think of it as a bonus for playing well, even if you don\'t win the whole thing!`
      },
      {
        question: 'How do I win?',
        answer: `It\'s pretty simple—just hit the target score (or better) in the Stableford competitions you\'ve placed a stake on, and you\'ll bag yourself a reward. We\'ve got three different games, each with its own target score, ranging from 34 to 40 Stableford points. Just play well and you\'ll be in for a reward!`
      },
      {
        question: 'Who am I competing against?',
        answer: `It\'s just you versus the course. No one else. You\'re only playing against your own score, so focus on your game and see if you can beat that target score!`
      },
      {
        question: 'Can I play Stable Stakes at any golf club?',
        answer: `You can use Stable Stakes at your own golf club or in any Open competition. So whether it\'s a club comp or an Open, you\'re good to go!`
      },
      {
        question: 'How much does it cost to enter?',
        answer: `You can place a stake of £10, £20, or £50 for each game you play. The bigger the stake, the bigger the reward if you hit that target score! Simple as that.`
      },
      {
        question: 'Is there a cut-off time to enter a game?',
        answer: `Yes, you\'ve got to enter before midnight the day before your Stableford comp. So make sure to get your stake in before 12:00 AM.`
      },
      {
        question: 'What can I win?',
        answer: `We\'ve got three exciting games for you to choose from (with even more on the way).\n\nOn Fire: Hit the target and you\'ll get a 7x return on your stake, which means you could pocket up to £350!\nSweet Spot: This one gives you a 5x return, so you could win up to £250.\nSteady Eddie: Play it cool and double your stake with a 2x return, letting you walk away with up to £100.\n\nPlenty of rewards, just for playing your best game!`
      },
      {
        question: 'Can I enter more than one game for each competition?',
        answer: `Absolutely! In fact, entering multiple games can be a smart move. Winning a game like Steady Eddie can help cover your stakes, while you go after the bigger rewards in Sweet Spot or On Fire. It\'s all about playing it your way!`
      },
      {
        question: 'What is a Caddie Token?',
        answer: `Caddie Tokens give you a little extra boost when playing Stable Stakes games. The more you play, the more Caddie Tokens you earn! You can use them to improve the score you need to hit in your Stableford comp to win, or to get your money back if you miss the target. They\'re there to help improve your chances of bagging those big rewards.\n\nYour available Caddie Tokens will pop up when you enter a game, but remember, you can only use one per game entry.`
      },
      {
        question: 'What do I do after I\'ve entered my game?',
        answer: `Absolutely nothing! We\'ve got it covered from here. Just focus on getting ready for your Stableford comp—hit those greens, sink those putts, and aim for a solid scorecard. Enjoy your round!`
      },
      {
        question: 'How do I submit my score?',
        answer: `You don\'t need to do a thing! We\'ve got direct access to all competition scores in the UK. Just hand in your scorecard as usual after your comp, and we\'ll take care of the rest. Easy peasy!`
      },
      {
        question: 'Do I have to enter a game for every competition round I play?',
        answer: `Nope! You can use Stable Stakes whenever you feel like it. As long as you\'re playing in a Stableford comp at your club, you decide when to jump in. Just make sure to get your stake in by midnight the day before the competition.`
      },
      {
        question: 'What happens if I forget to enter a game?',
        answer: `Unfortunately, all games must be entered by midnight the day before your competition. To avoid missing out, make sure you enable push notifications for the Stable Stakes app, and we\'ll send you friendly reminders to get your stakes in ahead of time!`
      },
      {
        question: "Why do the prize amounts say 'up to'?",
        answer: `Most of the time, the prize amount shown is exactly what you\'ll get if you hit the target score. But on the rare occasion that a lot of players win on the same day, we may need to adjust down the payout slightly—usually by around 10-20%. This helps cover our costs and ensures we can keep improving and adding new features for everyone.`
      },
      {
        question: 'Why does it take 3 days to get my results and winnings?',
        answer: `Our score data comes straight from DotGolf, the official tech partner for all UK golf governing bodies. It takes about 24 hours for all scores to be validated, and then up to 48 hours for your winnings to be processed and show up in your app wallet. We\'re always working on making things quicker, so this should speed up in the future!`
      },
      {
        question: 'Can I cancel or amend my game?',
        answer: `Yes, you can! Just make sure to cancel or make any changes by midnight the day before your stableford competition. Head to the Your Games section in the app and hit the Edit button to make adjustments or cancel. If you cancel, your stake will be refunded to your wallet within 48 hours.`
      },
      {
        question: 'What happens if my competition round is cancelled?',
        answer: `It happens, especially with the British weather! If your round gets cancelled, just drop us a note through the Contact Page on our website and we\'ll sort it out for you. Your money will be returned to your wallet within 48 hours.`
      },
      {
        question: 'Can I use Stable Stakes in other competition formats?',
        answer: `Not at the moment... but watch this space! We\'ve got exciting plans in the works.`
      },
    ]
  },
  {
    group: 'Wallet',
    faqs: [
      {
        question: 'What do the different amounts in my wallet mean?',
        answer: `Not all the money in your wallet can be redeemed for vouchers, which is why you\'ll see two amounts: Total Amount and Redeemable Amount. For example, cash from a successful Refer a Friend reward can only be used to place stakes in games, not for vouchers. Also, only the money you\'ve deposited yourself can be withdrawn back to your bank account. Winnings from competitions or Refer a Friend rewards can\'t be cashed out.`
      },
      {
        question: 'How do I spend my winnings at my club\'s pro shop?',
        answer: `It\'s easy! Just choose the amount you want to redeem for vouchers in the Stable Stakes app, and you\'ll get a unique voucher code via email. Take that code to your pro shop, and you\'re good to go!\nMost pro shop vouchers will be for Foremost Golf, System 2, or System 3, depending on what your pro shop uses. If your pro shop doesn\'t use one of these systems, we\'ll contact them directly and sort it out for you. You should get your voucher code within 24 hours—just keep an eye on your junk mail in case it takes a bit longer.`
      },
      {
        question: 'How do I spend my winnings at retailers?',
        answer: `It\'s easy! Just head to the Pro Shop section in the app, choose the retailer you\'d like to redeem your vouchers for, and we\'ll email you a voucher code within 28 hours. Then, you\'re all set to grab yourself some great golf gear, a holiday, or whatever takes your fancy!`
      },
      {
        question: 'Can I claim my winnings as cash?',
        answer: `No, Stable Stakes doesn\'t offer cash prizes. Since we\'re an amateur golf competition, all your winnings are redeemed as vouchers for your club\'s pro shop or other major retailers—no cash payouts here!`
      },
      {
        question: 'When am I charged?',
        answer: `You\'ll be charged either when you top up your wallet or when you place your stake before your competition. This way, everything\'s sorted in advance of your Stableford comp, and if you hit that target score, there\'s no delay in getting your winnings!`
      },
    ]
  },
  {
    group: 'Eligibility',
    faqs: [
      {
        question: 'Do I need to be a member of a club to use Stable Stakes?',
        answer: `Yes, you need to be a member of a registered golf club in the UK to use Stable Stakes.`
      },
      {
        question: 'Are there any age restrictions for using Stable Stakes?',
        answer: `Yes, you must be 18 or over to enter and play Stable Stakes games.`
      },
      {
        question: 'Do I need a golf handicap to use Stable Stakes?',
        answer: `Yes, since a handicap is required to enter organised Stableford competitions at golf clubs, you\'ll need an official handicap that\'s governed by one of the UK\'s golf bodies and follows the World Handicap System (WHS) to enter Stable Stakes games.`
      },
    ]
  },
  {
    group: 'Account',
    faqs: [
      {
        question: 'How does Refer a Friend work?',
        answer: `For every friend who signs up and completes a game, you\'ll get £10 in your wallet to spend on your own games. And the best part? There\'s no limit—keep referring, and we\'ll keep rewarding!\n\nTo refer a friend, just head to the Refer a Friend option on the Games page and share your unique link via email, SMS, WhatsApp, Facebook Messenger, or however you like. Easy as that!`
      },
      {
        question: 'How do I track my games and winnings?',
        answer: `You can easily track your upcoming and completed games in the Your Games section of the Stable Stakes app. For a full breakdown of your stakes, redemptions, and deposits, just head to your account in the app and select Transaction History. Everything you need is right there.`
      },
      {
        question: 'What do I do if I\'ve forgotten my password?',
        answer: `No worries, it happens! Just tap the Forgotten Password button on the app\'s login screen, follow the steps to reset it, and you\'ll be back earning those rewards in no time.`
      },
      {
        question: 'Got any other questions or issues?',
        answer: `No problem! Just drop us a message through our contact form, and we\'ll do everything we can to sort it out for you.`
      },
    ]
  },
];

interface FAQ {
  question: string;
  answer: string;
}

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onPress: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer, isOpen, onPress }) => {
  return (
    <View style={styles.accordionContainer}>
      <Pressable
        style={[
          styles.questionRow,
          {
            borderTopLeftRadius: scaleWidth(20),
            borderTopRightRadius: scaleWidth(20),
            borderBottomLeftRadius: isOpen ? 0 : scaleWidth(20),
            borderBottomRightRadius: isOpen ? 0 : scaleWidth(20),
            height: scaleHeight(55),
            backgroundColor: '#FFF',
            ...(isOpen
              ? {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.18,
                  shadowRadius: 16,
                  elevation: 12,
                  zIndex: 2,
                }
              : { zIndex: 1 }),
          },
        ]}
        onPress={onPress}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Image
          source={isOpen
            ? require('../../../../assets/icons/account/Chevron up.png')
            : require('../../../../assets/icons/account/Chevron down.png')}
          style={styles.arrowIcon}
        />
      </Pressable>
      <Collapsible collapsed={!isOpen} align="top">
        <ScrollView
          nestedScrollEnabled
          style={{
            maxHeight: scaleHeight(300),
            width: '100%',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: scaleWidth(20),
            borderBottomRightRadius: scaleWidth(20),
            backgroundColor: '#FFF',
            marginTop: scaleHeight(-10),
            zIndex: 0,
            paddingTop: scaleHeight(25),
            paddingBottom: scaleHeight(25),
            alignSelf: 'center',
          }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </ScrollView>
      </Collapsible>
    </View>
  );
};

interface FAQGroupProps {
  group: string;
  faqs: FAQ[];
  openIndex: number | null | undefined;
  onToggle: (idx: number) => void;
}

const FAQGroup: React.FC<FAQGroupProps> = ({ group, faqs, openIndex, onToggle }) => (
  <View style={styles.groupContainer}>
    <Text style={styles.groupHeader}>{group}</Text>
    {faqs.map((faq: FAQ, idx: number) => (
      <Accordion
        key={faq.question}
        question={faq.question}
        answer={faq.answer}
        isOpen={openIndex === idx}
        onPress={() => onToggle(idx)}
      />
    ))}
  </View>
);

const FAQStep = () => {
  const [open, setOpen] = useState<Record<number, number | null>>({}); // { groupIndex: openFaqIndex }

  const handleToggle = (groupIdx: number, faqIdx: number) => {
    setOpen(prev => ({
      ...prev,
      [groupIdx]: prev[groupIdx] === faqIdx ? null : faqIdx
    }));
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.faqContainer}>
          {FAQ_DATA.map((group, groupIdx) => (
            <FAQGroup
              key={group.group}
              group={group.group}
              faqs={group.faqs}
              openIndex={open[groupIdx]}
              onToggle={faqIdx => handleToggle(groupIdx, faqIdx)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3E3E3',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleHeight(20),
  },
  faqContainer: {
    width: scaleWidth(300),
    minHeight: scaleHeight(723.705),
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: scaleHeight(16),
    flexShrink: 0,
    alignSelf: 'center',
  },
  groupContainer: {
    width: '100%',
    marginBottom: scaleHeight(24),
  },
  groupHeader: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(16),
    fontStyle: 'italic',
    fontWeight: '800',
    lineHeight: scaleHeight(22),
    textTransform: 'uppercase',
    marginBottom: scaleHeight(8),
    flexShrink: 0,
  },
  accordionContainer: {
    width: '100%',
    marginBottom: scaleHeight(8),
    alignSelf: 'center',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleHeight(35),
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    marginBottom: 0,
  },
  questionText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: scaleHeight(18.2),
    flex: 1,
  },
  arrowIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    marginLeft: scaleWidth(8),
    resizeMode: 'contain',
  },
  answerText: {
    color: '#18302A',
    fontFamily: 'Poppins',
    fontSize: scaleWidth(13),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: scaleHeight(18.2),
    textAlign: 'center',
    padding: scaleWidth(12),
  },
});

export default FAQStep; 