import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as ReactQuill from 'react-quill';

import { actionCreators as postActionCreator } from '../store/modules/Post';
import { IStoreState } from '../store/modules';
import { PostState } from '../store/modules/Post';

import Cover from '../component/Write/Cover';
import ImageUploader from '../component/Write/ImageUploader';
import EditorBox from '../component/Write/EditorBox';
import SendButton from '../component/Write/SendButton';

import 'react-quill/dist/quill.snow.css';

interface State {
  editorState: any;
  postTitle: string;
  subTitle?: string;
  bookCoverImg?: string | null;
  uploadingImg?: boolean;
}

type StoreProps = PostState;

interface DispatchProps {
  postAction: typeof postActionCreator;
}

interface OwnProps {}

type Props = StoreProps & DispatchProps & OwnProps;

const Quill = ReactQuill as any;

const modules = {
  toolbar: [
    // [ { font: Font.whitelist } ],
    [ { font: [ 'miraza', 'roboto', 'amam' ] } ],
    [ { header: [ 1, 2, false ] } ],
    [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
    [ { list: 'ordered' }, { list: 'bullet' } ],
    [ 'link', 'image' ],
    [ { align: [] } ],
    [ 'clean' ]
  ]
};

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'align'
];

class WrtingBookReviewContainer extends React.Component<Props, State> {
  static getDerivedStateFromProps (nextProps: Props) {
    return nextProps;
  }

  state = {
    editorState: '',
    postTitle: '',
    subTitle: '',
    bookCoverImg: null,
    uploadingImg: false
  };

  constructor (props: any) {
    super(props);
  }

  componentDidMount () {
    console.log('didmount');
    const { postTitle, subTitle, editorState, bookCoverImg } = this.props;
    this.setState({
      postTitle,
      subTitle,
      editorState,
      bookCoverImg
    });
  }

  onChange = (editorState: string) => {
    this.props.postAction.onChangePostContent(editorState);
  };

  onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.postAction.onChangePostTitle(e.currentTarget.value);
  };
  onChangeSubTitle = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.props.postAction.onChangeSubTitle(e.currentTarget.value);
  };

  fileChangedHandler = (files: FileList) => {
    const file = files[0];
    const formData = new FormData();
    formData.append('imgFile', file, file.name);
    axios
      .post('http://localhost:8080/post/uploadImage', formData, {
        onUploadProgress: (progressEvent) => {
          this.setState({
            uploadingImg: true
          });
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          bookCoverImg: data.data.location,
          uploadingImg: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  focus = () => {
    console.log('focus');
  };

  onClickWritePost = () => {
    this.props.postAction.writePost(this.state);
  };

  render () {
    console.log('render');
    return (
      <React.Fragment>
        <Cover
          postTitle={this.state.postTitle}
          onChangeTitle={this.onChangeTitle}
          subTitle={this.state.subTitle}
          onChangeSubTitle={this.onChangeSubTitle}
        >
          <ImageUploader
            fileChangedHandler={this.fileChangedHandler}
            bookCoverImg={this.state.bookCoverImg}
            uploadingImg={this.state.uploadingImg}
          />
        </Cover>
        <EditorBox focus={this.focus}>
          <Quill
            theme="snow"
            value={this.state.editorState}
            onChange={this.onChange}
            modules={modules}
            formats={formats}
          />
        </EditorBox>
        <SendButton onClickSubmit={this.onClickWritePost} />
      </React.Fragment>
    );
  }
}

export default connect<StoreProps, DispatchProps, OwnProps>(
  ({ Post }: IStoreState): StoreProps => ({
    editorState: Post.editorState,
    postTitle: Post.postTitle,
    subTitle: Post.subTitle,
    bookCoverImg: Post.bookCoverImg
  }),
  (dispatch: any) => ({
    postAction: bindActionCreators(postActionCreator, dispatch)
  })
)(WrtingBookReviewContainer);
