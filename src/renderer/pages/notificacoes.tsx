import { Grid } from "@mui/material"
import { Notification, View } from "../components"

const Notificacoes = () => {
  return (
    <View loading={false}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Notification />
        </Grid>
      </Grid>
    </View>
  )
}

export default Notificacoes
