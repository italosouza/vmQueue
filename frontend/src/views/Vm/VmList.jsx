import React from 'react'

import api from 'services/api'

// import CustomTable from "components/Table/Table"
// import { withStyles } from "@material-ui/core/styles"

// import styles from "assets/jss/material/views/PageListStyle"

class VmList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      loading: false
    }
  }

  getDados() {
    this.setState({ loading: true })
    api.get(`/vm`).then(res => {
      const rows = res.data
      this.setState({ rows, loading: false })
    })
  }

  handleDelete(id) {
    api.delete(`/api/users/${id}`).then(() => {})
  }

  componentDidMount() {
    this.getDados()
  }

  render() {
    return (
      <React.Fragment>
        <ul className="tweet-list">
          {this.state.rows.map((item, i) => ({ item }))}
        </ul>
      </React.Fragment>
    )
  }
}

export default VmList
