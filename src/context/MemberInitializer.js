import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMember } from "../apis/etc2_memberapis/memberApis"; // fetchMember 액션 임포트

function MemberInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        // 멤버 정보를 초기화하는 액션을 디스패치
        dispatch(fetchMember());
    }, [dispatch]);

    return null; // UI가 필요 없으므로 null 반환
}

export default MemberInitializer;
