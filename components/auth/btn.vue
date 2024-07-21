<script setup lang="ts">
const user = useCurrentUser()
const { signInWithGoogle, signOut } = useAuth()
const login = async () => {
  const r = await signInWithGoogle()
  console.log("urser", r)
}

const logout = async () => {
  if (!confirm("로그아웃 하시겠습니까?")) return
  await signOut()
}
</script>
<template>
  <q-btn v-if="!user" round flat @click="login">
    <q-avatar>
      <q-icon name="mdi-login" />
    </q-avatar>
  </q-btn>
  <q-btn v-else round>
    <q-avatar>
      <q-img v-if="user.photoURL" :src="user.photoURL" />
      <q-icon name="mdi-logout" />
    </q-avatar>
    <q-menu>
      <q-card>
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-avatar>
                <q-img :src="user?.photoURL || ''" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>이름</q-item-label>
              <q-item-label>{{ user.displayName }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn
            label="로그아웃"
            flat
            icon="mdi-logout"
            color="primary"
            @click="logout"
          />
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-btn>
</template>
