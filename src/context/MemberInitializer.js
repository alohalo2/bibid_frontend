import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMember, checkLogin } from "../apis/etc2_memberapis/memberApis"; // fetchMember 액션 임포트

function MemberInitializer() {

    const dispatch = useDispatch();

    useEffect(() => {
        const initializeMember = async () => {
            try {
                const result = await dispatch(checkLogin()).unwrap(); // checkLogin이 성공적으로 완료되었을 때만 다음 코드 실행
                if (result.item === "ROLE_USER") { // 로그인 상태 확인
                    dispatch(fetchMember());
                }
            } catch (error) {
                console.warn("로그인되지 않은 상태입니다.", error);
            }
        };

        initializeMember();
    }, [dispatch]);

    return null; // UI가 필요 없으므로 null 반환
}

export default MemberInitializer;
