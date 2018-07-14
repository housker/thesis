import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Button, Item } from 'semantic-ui-react';
import axios from 'axios';
import ArticleItem from './ArticleItem.jsx';

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    let categoryId = this.props.match.params.categoryId;
    let companyId = this.props.match.params.companyId;
    // fetch all articles for the given category and company
    axios.get(`/${companyId}/categories/${categoryId}/articlesdata`)
      .then(result => {
        this.setState({
          articles: result.data
        });
      })
  }

  render() {
    let renderArticles = this.state.articles.map(article => {
      return (<div key={article.id}><ArticleItem article={article} /></div>);
    })
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column floated='left'>
              <Header as='h2'>Articles</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={10}>
            <Button floated='right'>Add New Article</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Item.Group divided>
              {renderArticles}
            </Item.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ArticlesPage;