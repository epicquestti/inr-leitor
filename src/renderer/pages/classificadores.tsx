import { Grid } from "@mui/material"
import { useState } from "react"
import { ClassificadoresList, View } from "../components"

const Classificadores = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [list] = useState<[]>([])
  // useEffect(() => {}, [])
  return (
    <View
      loading={loading}
      handleClose={() => {
        setLoading(false)
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <ClassificadoresList loading={loading} list={list} />
        </Grid>
      </Grid>
    </View>
  )
}

export default Classificadores
