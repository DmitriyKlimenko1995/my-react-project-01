import React from "react";
import Content from "./Content";
import { useParams } from "react-router-dom";
import { setProfileData, setUsers } from "../MyData/users-slice";
import { connect } from "react-redux";

class ContentContainer extends React.Component {

    componentDidMount() {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/users`);
                const data = await res.json();
                this.props.setUsers(data.users);
                const profile = this.props.users.find(p => p.id === Number(this.props.id));
                if (profile) {
                    this.props.setProfileData(profile);
                    debugger;
                }
            } catch (error) {
                console.error("Ошибка при загрузке пользователей:", error);
            }
        };

        fetchUsers();
    }

    /* componentDidUpdate(prevProps) {
        debugger;
        if (
            prevProps.users !== this.props.users &&
            this.props.id
        ) {
            const profile = this.props.users.find(p => p.id === Number(this.props.id));
            if (profile) {
                this.props.setProfileData(profile);
                debugger;
            }
        }
    } */


    /*  UserProfile = () => {
         const { id } = useParams();
         const profile = this.props.users.find(p => p.id === id);
         debugger;
         if (profile) {
             this.props.setProfileData(profile);
         }
     } */


    render() {
        if (!this.props.isLoaded) {
            return <div>Загрузка данных...</div>;
        }

        return <Content {...this.props} />;
    }
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    Profile: state.users.ProfileData,
    isLoaded: state.users.users.length > 0 && state.users.ProfileData.id
});

const mapDispatchToProps = {
    setProfileData,
    setUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);