import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getFullName } from '@/utils/getFullName';
import { styles } from './Profile.styles';
import Divider from '@/ui/Divider';
import { useWalletAmountQuery } from '@/services/apis/wallet.api';
import Wallet from '@/components/Wallet';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import { Button, Text } from '@/ui';
import { Fonts, fontSize } from '@/utils/fonts';
import { Spacing } from '@/utils/constants';
import { useUserDetailsQuery } from '@/services/apis/login.api';
import { remove } from '@/utils/storage';
import { ScreenNames } from '@/utils/screenName';
import AddressModal from '@/components/AddressModal/AddressModal';
import { Colors } from '@/utils/colors';
import SocialMediaModal from '@/components/SocialMediaModal/SocialMediaModal';
import { TransactionModal } from '@/components/TransactionModal/TransactionModal';
import { data } from '@/utils/mockData';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';

export default function Profile() {
  const { data: user } = useUserDetailsQuery({});
  const { data: wallet, refetch } = useWalletAmountQuery({});
  const navigation: any = useNavigation();
  const [addressModal, setShowAddressModal] = useState(false);
  const [socialMediaModal, setSocialMediaModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const fullName = getFullName(user?.first_name, user?.last_name);

  const handleLogout = useCallback(() => {
    remove('token');
    navigation.navigate(ScreenNames.loginStack);
  }, [navigation]);

  const handleToggleAddressModal = useCallback(() => {
    setShowAddressModal(!addressModal);
  }, [addressModal]);

  const handleSocialChange = useCallback(() => {
    setSocialMediaModal(!socialMediaModal);
  }, [socialMediaModal]);

  const handleToggleTransactionModal = useCallback(() => {
    setTransactionModal(!transactionModal);
  }, [transactionModal]);

  const handleToggleChangePasswordModal = useCallback(() => {
    setPasswordModal(!passwordModal);
  }, [passwordModal]);


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <ProfileInfo data={user} fullName={fullName} />
          <Divider style={styles.divider} />
          <Wallet
            wallet={wallet}
            onRefreshWallet={refetch}
            onWithdraw={() => { }}
          />

          <Divider style={styles.divider} />
          <Pressable onPress={handleToggleAddressModal}>
            <Text style={{ textAlign: 'left', color: Colors.info }}>
              Change Address
            </Text>
            <AddressModal
              onClose={() => setShowAddressModal(!addressModal)}
              visible={addressModal}
            />
          </Pressable>
          <Pressable
            style={{ marginTop: Spacing.m }}
            onPress={handleSocialChange}>
            <Text style={{ textAlign: 'left', color: Colors.info }}>
              Add / Change Social Media link
            </Text>
            <SocialMediaModal
              visible={socialMediaModal}
              onClose={handleSocialChange}
            />
          </Pressable>
          <Pressable
            style={{ marginTop: Spacing.m }}
            onPress={handleToggleTransactionModal}>
            <Text style={{ textAlign: 'left', color: Colors.info }}>
              Transaction History
            </Text>
            <TransactionModal
              data={data}
              onClose={handleToggleTransactionModal}
              visible={transactionModal}
            />
          </Pressable>
          <Pressable
            style={{ marginTop: Spacing.m }}
            onPress={handleToggleChangePasswordModal}>
            <Text style={{ textAlign: 'left', color: Colors.info }}>
              Change PIN
            </Text>
            <ChangePasswordModal
              onClose={handleToggleChangePasswordModal}
              visible={passwordModal}
            />
          </Pressable>
          <Divider style={styles.divider} />
          <View>
            <Text style={{ ...Fonts.h3 }}>About me</Text>
            <View style={{ gap: Spacing.xs, marginTop: Spacing.m }}>
              <Text>
                <Text style={styles.userBio}>
                  contact on:{' '}
                </Text>
                {user?.mobile_number}
              </Text>
              <Text>
                <Text style={styles.userBio}>
                  Account type:{' '}
                </Text>
                {user?.category}
              </Text>
              <Text>
                <Text
                  style={styles.userBio}>
                  Hobbies:{' '}
                </Text>
                {user?.hobby}
              </Text>
              <Text>
                <Text style={styles.userBio}>
                  Gender:{' '}
                </Text>
                {user?.gender}
              </Text>
            </View>
          </View>
        </View>
        <Button style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </View>
    </View>
  );
}
